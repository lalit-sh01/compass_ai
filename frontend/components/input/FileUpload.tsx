'use client';

import { useCallback, useState } from 'react';
import { Upload, File, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onURLSubmit: (url: string) => void;
  loading?: boolean;
  error?: string | null;
}

export default function FileUpload({ onFileSelect, onURLSubmit, loading = false, error = null }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
          onFileSelect(file);
        } else {
          alert('Please upload a JSON file');
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
          onFileSelect(file);
        } else {
          alert('Please upload a JSON file');
        }
      }
    },
    [onFileSelect]
  );

  const handleURLSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (urlInput.trim()) {
        onURLSubmit(urlInput.trim());
      }
    },
    [urlInput, onURLSubmit]
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          id="file-upload"
          accept=".json,application/json"
          onChange={handleFileInput}
          className="hidden"
          disabled={loading}
        />

        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}

          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {loading ? 'Loading roadmap...' : 'Drop your roadmap JSON here'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">or</p>
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500">Supports JSON files conforming to the roadmap schema</p>
        </div>
      </div>

      {/* URL Input */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
          <span className="text-sm text-gray-500 dark:text-gray-500">or load from URL</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-700" />
        </div>

        <form onSubmit={handleURLSubmit} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/roadmap.json"
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
                <File className="w-4 h-4" />
                Load
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">Validation Error</h4>
            <pre className="text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono">{error}</pre>
          </div>
        </div>
      )}

      {/* Quick Load Example */}
      <div className="text-center">
        <button
          onClick={() => onURLSubmit('/final_roadmap.json')}
          disabled={loading}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Load example roadmap (final_roadmap.json)
        </button>
      </div>
    </div>
  );
}
