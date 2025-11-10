import "@/components/ContactMap/ContactMap.css";

export function ContactMap() {
  return (
    <section className="contact-map">
      <div className="container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1268.6918206244814!2d30.2283177!3d50.5084282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472b33ce333d6bbd%3A0xcbfb76c882f8c2ef!2zUHVtcExhYlVBLnNob3Ag0KHQn9Ce0KDQotCY0JLQndCVINCl0JDQoNCn0KPQktCQ0J3QndCv!5e0!3m2!1suk!2sua!4v1762793497101!5m2!1suk!2sua"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
