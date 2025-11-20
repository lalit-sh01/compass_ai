'use client'

import { useState, useRef } from 'react'
import { Upload, FileJson, Check, AlertCircle, X } from 'lucide-react'

import { useApiClient } from '@/lib/api-client'

export default function ImportRoadmap() {
  const apiClient = useApiClient()
  const [isOpen, setIsOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      await uploadFile(file)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await uploadFile(file)
    }
  }

  const uploadFile = async (file: File) => {
    setError(null)
    setSuccess(false)

    // Validate file type
    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      // Read file content
      const text = await file.text()
      const roadmapData = JSON.parse(text)

      // Upload to API
      const result = await apiClient.post('/api/roadmaps/import', {
        roadmap: roadmapData
      })

      setSuccess(true)

      // Redirect to the viewer with the roadmap ID
      setTimeout(() => {
        window.location.href = `/viewer?roadmapId=${result.id}`
      }, 1500)
    } catch (err) {
      console.error('[ImportRoadmap] Error caught:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to import roadmap';
      console.error('[ImportRoadmap] Error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setUploading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden rounded-lg border-2 border-dashed border-border p-6 transition-all hover:border-primary hover:bg-primary/5 w-full"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary font-primary">
            Import Roadmap
          </h3>
          <p className="mt-2 text-sm text-text-secondary group-hover:text-primary/80 font-secondary">
            Upload a pre-generated roadmap JSON file
          </p>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-surface p-6 shadow-xl border border-border">
        {/* Close button */}
        <button
          onClick={() => {
            setIsOpen(false)
            setError(null)
            setSuccess(false)
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileJson className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-text-primary font-primary">Import Roadmap</h2>
          </div>
          <p className="text-sm text-text-secondary font-secondary">
            Upload a JSON file that matches our roadmap schema
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all ${dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
            } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center">
            <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${dragActive ? 'bg-primary/10' : 'bg-bg-secondary'
              }`}>
              <Upload className={`h-8 w-8 ${dragActive ? 'text-primary' : 'text-text-secondary'}`} />
            </div>

            <p className="mb-2 text-sm font-medium text-text-primary font-primary">
              {uploading ? 'Uploading...' : 'Drop your JSON file here'}
            </p>
            <p className="mb-4 text-xs text-text-secondary font-secondary">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-hover disabled:opacity-50 shadow-sm glow-accent transition-all"
            >
              Browse Files
            </button>
            <p className="mt-4 text-xs text-text-secondary font-secondary">
              Max file size: 5MB • Format: JSON
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-lg bg-red-50 p-4 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-900">Import Failed</p>
              <pre className="mt-1 text-sm text-red-700 whitespace-pre-wrap break-words font-mono bg-red-100/50 p-2 rounded">
                {error}
              </pre>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mt-4 flex items-start gap-3 rounded-lg bg-green-50 p-4 border border-green-200">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">Success!</p>
              <p className="mt-1 text-sm text-green-700">
                Roadmap imported successfully. Redirecting...
              </p>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 rounded-lg bg-primary/5 p-4 border border-primary/10">
          <p className="text-xs font-medium text-primary mb-2">Need help getting started?</p>
          <p className="text-xs text-text-secondary mb-3">
            Your JSON file must include: <code className="bg-bg-secondary px-1 rounded text-text-primary">title</code>, <code className="bg-bg-secondary px-1 rounded text-text-primary">goal</code>, <code className="bg-bg-secondary px-1 rounded text-text-primary">phases</code>, and other required fields.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/example-roadmap.json"
              download
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover underline"
            >
              <FileJson className="h-3 w-3" />
              Download Example
            </a>
            <span className="text-text-secondary">•</span>
            <a
              href="/json_schema_final.json"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover underline"
            >
              View Schema →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
