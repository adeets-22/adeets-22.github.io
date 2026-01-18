import Image from "next/image";
import Bookshelf from "@/components/Bookshelf";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header / Bio */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Image
            src="/images/Headshot 1.jpg"
            alt="Aditi"
            width={120}
            height={120}
            className="grayscale-hover rounded"
          />
          <div>
            <h1 className="text-4xl mb-2">Aditi</h1>
            <p className="text-sm text-[var(--accent)] mb-3">(uh-dee-tee)</p>
            <p className="mb-3">
              Hi! Welcome to my corner of the internet.
            </p>
            <p className="mb-3">
              I&apos;m currently the Head of Business and Operations at{" "}
              <a href="https://www.getpara.com/" target="_blank" rel="noopener noreferrer">
                Para
              </a>
              , where I&apos;ve been a member of the founding team since late 2022.
            </p>
            <p className="text-sm">
              <a href="mailto:contact@aditi.is">contact@aditi.is</a>
              {" · "}
              <a href="https://twitter.com/adeets_22" target="_blank" rel="noopener noreferrer">
                twitter
              </a>
              {" · "}
              <a href="https://www.linkedin.com/in/aditi-sriram22/" target="_blank" rel="noopener noreferrer">
                linkedin
              </a>
              {" · "}
              <a href="https://github.com/adeets-22" target="_blank" rel="noopener noreferrer">
                github
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Background + Writing side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0">
        <section className="bordered-section">
          <h2 className="text-2xl mb-4">Background</h2>
          <p className="text-sm leading-relaxed">
            My journey into crypto started in a product role at{" "}
            <a href="https://consensys.net/" target="_blank" rel="noopener noreferrer">ConsenSys</a>{" "}
            in 2017, where I worked on the first iteration of{" "}
            <a href="https://www.youtube.com/watch?v=TztR_7IehjU" target="_blank" rel="noopener noreferrer">
              Universal Logins
            </a>
            , a UX standard developed at the Ethereum Foundation. Since then, I&apos;ve held roles at{" "}
            <a href="https://thegraph.com/en/" target="_blank" rel="noopener noreferrer">The Graph</a> and at{" "}
            <a href="https://celestia.org/" target="_blank" rel="noopener noreferrer">Celestia</a>{" "}
            where I was the Business Lead, focusing on the broader adoption of{" "}
            <a href="https://celestia.org/learn/first-principles/modular-blockchains-and-first-principles/" target="_blank" rel="noopener noreferrer">
              modular blockchains
            </a>.
          </p>
        </section>

        <section className="bordered-section md:border-l-0">
          <h2 className="text-2xl mb-4">Writing</h2>
          <ul className="text-sm space-y-1.5">
            <li>
              <a href="https://blog.getpara.com/embedded-wallet-comparison/" target="_blank" rel="noopener noreferrer">
                How to Compare Embedded Wallets
              </a>
            </li>
            <li>
              <a href="https://blog.getpara.com/what-is-mpc/" target="_blank" rel="noopener noreferrer">
                What is MPC and Why Should I Care?
              </a>
            </li>
            <li>
              <a href="https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/" target="_blank" rel="noopener noreferrer">
                Ethereum Off-Chain Data Availability
              </a>
            </li>
            <li>
              <a href="https://blog.celestia.org/celestiums/" target="_blank" rel="noopener noreferrer">
                Quantum Gravity Bridge
              </a>
            </li>
            <li>
              <a href="https://forum.celestia.org/t/ethereum-rollup-call-data-pricing-analysis/141" target="_blank" rel="noopener noreferrer">
                Rollup Call Data Pricing Analysis
              </a>
            </li>
            <li>
              <a href="https://www.thejuggernaut.com/crypto-india" target="_blank" rel="noopener noreferrer">
                India&apos;s Traditionalist Crypto Ban
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Thoughts - full width */}
      <section className="bordered-section border-t-0">
        <h2 className="text-2xl mb-4">Milestones I&apos;m Proud Of</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <a href="https://www.linkedin.com/feed/update/urn:li:activity:7389088815442845696/" target="_blank" rel="noopener noreferrer" className="block border border-[var(--border)] hover:bg-[#efe4d8] transition-colors">
            <Image src="/images/event-table-2.png" alt="Para dinner event" width={200} height={150} className="w-full h-28 object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            <div className="p-3">
              <span className="block text-2xl font-serif mb-1">10M+</span>
              <span className="text-[var(--accent)]">users powered by Para across 100+ products</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/feed/update/urn:li:activity:7384616307683405824/" target="_blank" rel="noopener noreferrer" className="block border border-[var(--border)] hover:bg-[#efe4d8] transition-colors">
            <Image src="/images/event-crowd.png" alt="Para community event" width={200} height={150} className="w-full h-28 object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            <div className="p-3">
              <span className="block text-2xl font-serif mb-1">90M+</span>
              <span className="text-[var(--accent)]">transactions powered by Para and partners</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/feed/update/urn:li:activity:7361585304232759296/" target="_blank" rel="noopener noreferrer" className="block border border-[var(--border)] hover:bg-[#efe4d8] transition-colors">
            <Image src="/images/event-tote.png" alt="Go Beyond Onboarding" width={200} height={150} className="w-full h-28 object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            <div className="p-3">
              <span className="block text-2xl font-serif mb-1">ENS, Metamask</span>
              <span className="text-[var(--accent)]">among Para&apos;s early partners</span>
            </div>
          </a>
          <a href="https://getpara.com/about" target="_blank" rel="noopener noreferrer" className="block border border-[var(--border)] hover:bg-[#efe4d8] transition-colors">
            <Image src="/images/team.jpg" alt="Para team" width={200} height={150} className="w-full h-28 object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            <div className="p-3">
              <span className="block text-2xl font-serif mb-1"><u>Shaping</u></span>
              <span className="text-[var(--accent)]">a world-class team</span>
            </div>
          </a>
        </div>
      </section>

      {/* Speaking + Other Interests side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-0">
        <section className="bordered-section border-t-0 dashed-border border-t-0">
          <h2 className="text-2xl mb-4">Speaking</h2>
          <ul className="text-sm space-y-1.5">
            <li>
              <a href="https://www.youtube.com/watch?v=xlVQHlMKYVY" target="_blank" rel="noopener noreferrer">
                Stable Stories with Eco (2025)
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=itZq6NvBEds" target="_blank" rel="noopener noreferrer">
                Between Two Chains with LayerZero
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=ovywPvZXj0Y" target="_blank" rel="noopener noreferrer">
                Wallets & Building @ Buidl Guidl
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=2x9zbbxMhyk" target="_blank" rel="noopener noreferrer">
                Modular Summit @ EthCC 2023
              </a>
            </li>
            <li>
              <a href="https://www.othersidepod.xyz/episode/38" target="_blank" rel="noopener noreferrer">
                The Power of Forking
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=NhHs1lPCzK0" target="_blank" rel="noopener noreferrer">
                SXSW 2019: Universal Logins
              </a>
            </li>
          </ul>
        </section>

        <section className="bordered-section md:border-l-0 border-t-0">
          <h2 className="text-2xl mb-4">Interests</h2>
          <div className="text-sm space-y-3">
            <p>
              <a href="https://soundcloud.com/adeets_22" target="_blank" rel="noopener noreferrer">
                Music production
              </a>
              {" · "}
              Political economics
              {" · "}
              Fashion & CPG
              {" · "}
              Jewelry collector
              {" · "}
              Exploring SF
            </p>
            <p>
              <span className="text-[var(--accent)]">Favorite subs:</span>{" "}
              <a href="https://reddit.com/r/tooafraidtoask" target="_blank" rel="noopener noreferrer">r/tooafraidtoask</a>,{" "}
              <a href="https://reddit.com/r/randonauts" target="_blank" rel="noopener noreferrer">r/randonauts</a>,{" "}
              <a href="https://reddit.com/r/coolguides" target="_blank" rel="noopener noreferrer">r/coolguides</a>
            </p>
          </div>
        </section>
      </div>

      {/* Bookshelf - full width */}
      <section className="bordered-section border-t-0">
        <h2 className="text-2xl mb-4">Bookshelf</h2>
        <Bookshelf />
      </section>
    </main>
  );
}
