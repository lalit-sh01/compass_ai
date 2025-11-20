import { Sparkles, Send } from 'lucide-react';

export function CopilotSidebar() {
    return (
        <div className="flex h-[calc(100vh-2rem)] flex-col rounded-2xl border border-border bg-surface shadow-xl">
            <div className="border-b border-border p-4">
                <div className="flex items-center gap-2 text-indigo-500">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-bold">Compass AI</h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                    Context-aware assistance for your current task.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Mock Chat History */}
                <div className="flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="min-w-0 rounded-2xl rounded-tl-none bg-indigo-50 dark:bg-indigo-900/20 p-3 text-sm">
                        <p>I noticed you're working on the <strong>OpenAI API Integration</strong>. Would you like to see a boilerplate code snippet for the client setup?</p>
                    </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs font-bold">ME</span>
                    </div>
                    <div className="min-w-0 rounded-2xl rounded-tr-none bg-gray-100 dark:bg-gray-800 p-3 text-sm">
                        <p>Yes, please show me how to handle the API key securely.</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="min-w-0 rounded-2xl rounded-tl-none bg-indigo-50 dark:bg-indigo-900/20 p-3 text-sm">
                        <p>Here is a secure pattern using `python-dotenv`:</p>
                        <pre className="mt-2 rounded bg-black/5 dark:bg-black/50 p-2 text-xs font-mono overflow-x-auto">
                            {`from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")`}
                        </pre>
                    </div>
                </div>
            </div>

            <div className="border-t border-border p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask for help..."
                        className="w-full rounded-full border border-border bg-background py-2 pl-4 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button className="absolute right-1 top-1 rounded-full bg-indigo-500 p-1.5 text-white hover:bg-indigo-600">
                        <Send className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
