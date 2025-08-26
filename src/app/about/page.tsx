import ContactForm from '@/components/contact-form'

export default function AboutPage() {
  return (
    <main className="animate-fade-in flex h-full w-full flex-col items-center justify-center font-sans">
      <div className="flex w-full justify-center px-4">
        <ContactForm />
      </div>
    </main>
  )
}
