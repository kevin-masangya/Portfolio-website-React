import SectionHeading from "./SectionHeading";

const INPUT_CLASS =
  "w-full bg-[#140d0f] border border-[#382027] rounded-lg px-3.5 py-2.5 focus:outline-2 focus:outline-[#f23953]";
const LINK_CLASS =
  "flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#382027] bg-[#140d0f] hover:border-[#a72d43] hover:text-[#ff7180] transition-colors";

function Field({ id, label, children }) {
  return (
    <div className="layout-hover">
      <label className="text-sm text-[#b9a5aa] block mb-1" htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" data-reveal className="scroll-reveal border-t border-[#382027] py-20">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's talk" />
          <form action="mailto:sd@gmail.com" method="get" encType="text/plain" className="flex flex-col gap-4">
            <Field id="name" label="Name">
              <input id="name" name="name" type="text" required className={INPUT_CLASS} />
            </Field>
            <Field id="email" label="Your email">
              <input id="email" name="email" type="email" required className={INPUT_CLASS} />
            </Field>
            <Field id="message" label="Message">
              <textarea id="message" name="message" required rows={4} className={INPUT_CLASS} />
            </Field>
            <button
              type="submit"
              className="self-start px-6 py-3 rounded-xl font-semibold bg-[#f23953] text-[#19080d] hover:bg-[#ff5268] hover:-translate-y-0.5 transition-all"
            >
              Send message
            </button>
          </form>
        </div>

        <div className="layout-hover flex flex-col gap-3.5">
          <a href="https://github.com/kevin-masangya" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            GitHub — kevin-masangya
          </a>
          <a href="https://kmasavin.vercel.app" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            Portfolio site — KmasaVin.vercel.app
          </a>
          <a href="mailto:sd@gmail.com" className={LINK_CLASS}>
            Email — sd@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}