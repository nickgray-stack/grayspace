import Link from "next/link";
import ContactButton from "./ContactButton";

// Shared footer. Home/About = email row. Case Study adds a prev/next row above
// (with the straight hover-thumbnail preview). `prev`/`next` are
// { name, href, thumb } where thumb is any CSS background value.
// (GraySpace logo can be reintroduced here later.)
export default function Footer({ prev, next }) {
  const showPrevNext = prev || next;
  return (
    <footer>
      <div className="wrap">
        {showPrevNext && (
          <div className="pn">
            {prev ? (
              <Link href={prev.href}>
                <div className="l">Prev:</div>
                <div className="nm ul">{prev.name}</div>
                <span className="thumb" style={{ backgroundImage: prev.thumb }} />
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="r" href={next.href}>
                <div className="l">Next:</div>
                <div className="nm ul">{next.name}</div>
                <span className="thumb" style={{ backgroundImage: next.thumb }} />
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
        <div className="ftrow">
          <ContactButton>Email</ContactButton>
          <span className="fmuted">Detailed case studies upon request</span>
        </div>
      </div>
    </footer>
  );
}
