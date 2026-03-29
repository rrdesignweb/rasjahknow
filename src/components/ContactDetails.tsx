const ContactDetails = () => {
  return (
    <p className="!mb-0 md:text-right md:pt-0 pt-4">
      <strong>Manager - Jorge Abreu (Worldwide)</strong> <br />
      Phone:{" "}
      <a
        className="text-red-700 hover:text-red-900"
        href="tel:+61 416 652 906"
        data-obfuscation="0"
      >
        +61 416 652 906
      </a>
      <br />
      Email:{" "}
      <a
        className="text-red-700 hover:text-red-900"
        href="mailto:rasjahknowband@gmail.com"
        data-obfuscation="0"
      >
        rasjahknowband@gmail.com
      </a>
      <br />
      <br />
      <strong>Bookings Management (Worldwide)</strong> <br />
      Email:{" "}
      <a
        className="text-red-700 hover:text-red-900"
        href="mailto:bookings@rasjahknow.com"
        data-obfuscation="0"
      >
        bookings@rasjahknow.com
      </a>
    </p>
  );
};

export default ContactDetails;
