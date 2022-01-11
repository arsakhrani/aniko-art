import React from "react"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Container } from "./styles/TermsAndConditionsPage.styled"

export default function TermsAndConditionsPage() {
  return (
    <div>
      <Header grey={true} />
      <Container>
        <div style={{ display: "flex", paddingTop: "1em" }}>
          <p style={{ paddingLeft: "1em" }}>1</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            Aniko.Art intermediates between sellers and buyers of art. When
            acting as an agent, Aniko.Art will do her utmost to achieve a sale.
            Aniko.Art also intermediates between selling parties (gallery,
            auction house, artist or foundation). In that case the agent is
            allowed to lend the artwork to third parties to sell the artwork.
            Aniko.Art offers consulting services to a gallery, auction house or
            foundation (hereinafter referred to as ‘the Client’). When acting as
            a consultant, Aniko.Art will be hired as an Independent Contractor
            offering services such as, promoting and selling art, scouting for
            new artists, organising exhibitions and art auctions, maintaining
            administration. Aniko.Art is a sole proprietorship, with its
            registered office at (97150) Saint Martin, listed at the
            Traderegister of the French Chamber of commerce under registration
            number: C97811000892, with managing director: Anikó van Nie.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>2</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            Aniko.Art aims that the work will be delivered within seven days
            after purchase. Delivering abroad can take more time. After a
            purchase the buyer will be contracted by email on the delivery
            process. Please note that when a work is shipped to a non-EU
            country, customs fees may apply. Aniko.Art is using Fedex for
            international shipping services.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>3</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            Purchase prices include VAT when shipping within Europe. The
            shipping price will be discussed with the buyer when contracting the
            buyer. A purchased artwork can also be picked up at the artist’
            studio, gallery or auction house.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>4</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            In case the buyer is not satisfied with the artwork purchased via
            Aniko.Art, the buyer can send an email within 30 days after the
            purchase so Aniko.Art can start the return procedure. Works must be
            returned in person or shipped and assured as indicated by Aniko.Art.
            If possible, Aniko.Art will pick up the artwork herself when she’s
            around. Damaged artworks cannot be returned.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>5</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            Should you receive an artwork that is damaged, Aniko.Art must be
            notified without delay by sending an email to anikovannie@gmail.com
            including a photograph of the damage. In case of delivery by
            Aniko.Art, the artist or a representative (gallery, auction house,
            foundation) of the artist, or in case you collect a work yourself,
            the work must be inspected before accepting it. Aniko.Art nor the
            artist can be held responsible and/or liable for damages discovered
            after this moment of delivery or collection.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>6</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            When Aniko.Art acts as an agent for selling parties, she cannot be
            held liable for any damage occurring from the artworks purchased
            through Aniko.Art. As far damage occurs from the intermediation by
            Aniko.Art, Aniko.Art can only be held liable in case of gross
            negligence or intentional act on the side of Aniko.Art.{" "}
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>7</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            When Aniko.Art acts as an Independent Contractor for the Client
            (gallery, auction house, foundation), the liability for damage in
            whatever form suffered by the Client is limited to the amount paid
            out by the Independent Contractor's business liability insurance. If
            the Independent Contractor's insurer does not pay out, the
            Independent Contractor's liability is limited to the amount of €
            2,000.00. The Client shall ensure that she is adequately insured
            against the risk of damage on the part of the Independent Contractor
            during the execution of the Assignment. The Client indemnifies the
            Independent Contractor against all damage that the Independent
            Contractor will suffer in the performance of the Assignment that can
            be attributed to the Client.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ paddingLeft: "1em" }}>8</p>
          <p style={{ paddingLeft: "1em", paddingRight: "2em" }}>
            Only Dutch law is applicable.
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  )
}
