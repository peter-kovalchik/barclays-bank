const Map = () => {
  return (
    <div className="box xl:p-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.7081556097116!2d-0.12462618410057857!3d51.512710617817276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce88d420e5%3A0x7c42d7af1f9550b6!2sBarclays%20Bank%20-%20Piccadilly%20Circus%20Branch!5e0!3m2!1sen!2suk!4v1702450501605!5m2!1sen!2suk"
        width="100%"
        height="450"
        style={{ border: 0 }}
        className="rounded-xl border border-n30 dark:border-n500"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
