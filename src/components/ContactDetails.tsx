const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-4 pt-0  md:justify-end md:gap-6 md:text-right">
       <div>
        <p className="!mb-1">
          <strong>Bookings Management (Worldwide)</strong>
        </p>
        <p className="!mb-0">
          Email:{" "}
          <a
            className="text-red-700 hover:text-red-900"
            href="mailto:bookings@rasjahknow.com"
            data-obfuscation="0"
          >
            bookings@rasjahknow.com
          </a>
        </p>
      </div>
      <div>
        <p className="!mb-1">
          <strong>Manager - Jorge Abreu (Worldwide)</strong>
        </p>
        <p className="!mb-1">
          Phone:{" "}
          <a
            className="text-red-700 hover:text-red-900"
            href="tel:+61 416 652 906"
            data-obfuscation="0"
          >
            +61 416 652 906
          </a>
        </p>
        <p className="!mb-0">
          Email:{" "}
          <a
            className="text-red-700 hover:text-red-900"
            href="mailto:rasjahknowband@gmail.com"
            data-obfuscation="0"
          >
            rasjahknowband@gmail.com
          </a>
        </p>
      </div>

     
    </div>
  );
};

export default ContactDetails;
