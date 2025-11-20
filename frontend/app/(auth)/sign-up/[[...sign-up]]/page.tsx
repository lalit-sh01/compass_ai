import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary hover:bg-primary-hover text-sm normal-case',
            card: 'shadow-xl bg-surface',
            headerTitle: 'text-text-primary',
            headerSubtitle: 'text-text-secondary',
            socialButtonsBlockButton: 'border-border hover:bg-bg-secondary',
            socialButtonsBlockButtonText: 'text-text-primary font-normal',
            formFieldLabel: 'text-text-secondary',
            formFieldInput: 'border-border focus:border-primary focus:ring-primary bg-surface text-text-primary',
            footerActionLink: 'text-primary hover:text-primary-hover',
          }
        }}
      />
    </div>
  )
}
