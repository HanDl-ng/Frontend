export default function Marquee() {
  const companies = [
    { name: 'Jumia', mark: 'JM' },
    { name: 'Konga', mark: 'KG' },
    { name: 'PayPorte', mark: 'PP' },
    { name: 'Flutterwave', mark: 'FW' },
    { name: 'Piggyvest', mark: 'PV' },
    { name: 'Cowrywise', mark: 'CW' },
    { name: 'Carbon', mark: 'CB' },
    { name: 'Bamboo', mark: 'BM' },
    { name: 'Topship', mark: 'TS' },
    { name: 'Sendbox', mark: 'SB' },
    { name: 'Trove', mark: 'TR' },
    { name: 'Brass', mark: 'BR' },
  ];

  // Duplicate for seamless loop
  const allCompanies = [...companies, ...companies];

  return (
    <section className="marquee-section">
      <div className="marquee-intro">Trusted by the fastest growing businesses</div>
      <div className="marquee-wrap">
        <div className="marquee-track">
          {allCompanies.map((company, i) => (
            <div className="marquee-item" key={i}>
              <div className="marquee-icon" aria-hidden="true">
                <span>{company.mark}</span>
              </div>
              <div className="marquee-logo">{company.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
