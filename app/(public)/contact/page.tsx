export default function Contact() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-3">Restons en contact</p>
      <h1 className="font-display text-3xl md:text-4xl text-indigo mb-4">Nous contacter</h1>
      <p className="font-body text-encre/60 mb-10">
        Une question, une demande d&apos;adhésion, ou envie de rejoindre le bureau ? Écrivez-nous.
      </p>

      <div className="flex flex-col gap-3">
        <a href="https://wa.me/XXXXXXXXXXX" target="_blank" className="py-3 rounded-full bg-indigo text-papier font-body hover:bg-steel transition">
          WhatsApp
        </a>
        <a href="https://facebook.com/VOTRE-PAGE" target="_blank" className="py-3 rounded-full border border-indigo text-indigo font-body hover:bg-indigo/5 transition">
          Facebook
        </a>
        <a href="mailto:contact@aeestn.org" className="py-3 rounded-full border border-indigo text-indigo font-body hover:bg-indigo/5 transition">
          contact@aeestn.org
        </a>
      </div>
    </div>
  )
}