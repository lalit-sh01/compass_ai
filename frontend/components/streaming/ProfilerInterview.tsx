'use client';

import { useState, useEffect, useRef } from 'react';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ProfilerInterviewProps {
  onComplete: (userContext: any) => void;
  onError: (error: string) => void;
}

export function ProfilerInterview({
  onComplete,
  onError,
}: ProfilerInterviewProps) {
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Start the interview on mount
  useEffect(() => {
    const startInterview = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/agents/profile-interview/start`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setConversation(data.conversation);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to start interview';
        setError(errorMessage);
        onError(errorMessage);
        setIsLoading(false);
      }
    };

    startInterview();
  }, [onError]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isWaiting) return;

    // Add user message to conversation
    const updatedConversation: ConversationMessage[] = [
      ...conversation,
      {
        role: 'user',
        content: userInput,
      },
    ];
    setConversation(updatedConversation);
    setUserInput('');
    setIsWaiting(true);

    console.log('[ProfilerInterview] Sending request to backend with conversation:', updatedConversation);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const endpoint = `${apiUrl}/api/agents/profile-interview/continue`;
      console.log('[ProfilerInterview] API endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_history: updatedConversation,
        }),
      });

      console.log('[ProfilerInterview] Response status:', response.status);
      console.log('[ProfilerInterview] Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream available');

      console.log('[ProfilerInterview] Stream reader initialized, starting to read...');

      const decoder = new TextDecoder();
      let buffer = '';
      let assistantMessage = '';
      let isJsonComplete = false;
      let completeJson: any = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('[ProfilerInterview] Stream reading done');
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              const update = JSON.parse(jsonStr);
              console.log('[ProfilerInterview] SSE update:', update);

              if (update.error) {
                throw new Error(update.error);
              }

              if (update.content) {
                assistantMessage += update.content;
              }

              if (update.interview_complete) {
                console.log('[ProfilerInterview] Interview complete signal received');
                isJsonComplete = true;
                // Try to parse the assistant message as JSON
                try {
                  completeJson = JSON.parse(assistantMessage);
                  console.log('[ProfilerInterview] Successfully parsed UserContext JSON');
                } catch {
                  // If not valid JSON, keep the message as-is
                  console.log('[ProfilerInterview] Conversation complete but JSON parsing failed');
                }
              }
            } catch (e) {
              console.error('[ProfilerInterview] Failed to parse SSE update:', e);
            }
          }
        }
      }

      // Add assistant message to conversation
      console.log('[ProfilerInterview] Stream complete. Assistant message length:', assistantMessage.length);
      console.log('[ProfilerInterview] Assistant message:', assistantMessage);
      console.log('[ProfilerInterview] Is JSON complete:', isJsonComplete);

      if (assistantMessage) {
        const newConversation: ConversationMessage[] = [
          ...updatedConversation,
          {
            role: 'assistant',
            content: assistantMessage,
          },
        ];
        console.log('[ProfilerInterview] Adding assistant message to conversation');
        setConversation(newConversation);

        // If interview is complete, trigger completion
        if (isJsonComplete && completeJson) {
          console.log('[ProfilerInterview] Interview complete! UserContext:', completeJson);
          setInterviewComplete(true);
          onComplete(completeJson);
        }
      } else {
        console.warn('[ProfilerInterview] No assistant message received from stream!');
      }

      setIsWaiting(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      onError(errorMessage);
      setIsWaiting(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 max-w-2xl w-full">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
            Interview Failed
          </h3>
          <p className="text-red-800 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setConversation([]);
              setIsLoading(true);
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Restart Interview
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Initializing interview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-[calc(100vh-200px)] bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          🔍 The Inquisitor
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Let's understand your learning goals and personalize your roadmap
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isWaiting && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer - Input Form */}
      {!interviewComplete && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Share your thoughts..."
              disabled={isWaiting}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isWaiting || !userInput.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isWaiting ? 'Thinking...' : 'Send'}
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Tip: Be descriptive! The more details you provide, the better we can personalize your roadmap.
          </p>
        </div>
      )}

      {/* Interview Complete */}
      {interviewComplete && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-green-800 dark:text-green-200 font-medium">
            ✅ Interview Complete! Generating your personalized roadmap...
          </p>
        </div>
      )}
    </div>
  );
}
