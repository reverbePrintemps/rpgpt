"use client";
import { ReactNode, CSSProperties, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const getStartOfCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth());
};

const getEndOfCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0);
};

const today = new Date().toLocaleDateString();

export const Navbar = ({ children, className, style }: HeaderProps) => {
  const pathName = usePathname();
  const [shouldShowBanner, setShouldShowBanner] = useState(true);
  const handleBannerDismiss = () => setShouldShowBanner(false);
  const [hardLimit, setHardLimit] = useState<number>();
  const [usage, setUsage] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getSub = async () => {
      const res = await fetch(
        "https://api.openai.com/dashboard/billing/subscription",
        {
          credentials: "omit",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/114.0",
            Accept: "*/*",
            "Accept-Language": "en-GB,en;q=0.5",
            Authorization:
              "Bearer sess-aioet4W94SS6KRBnesQ2ObsPSNcmXqCloKJDU5nh",
            "Access-Control-Allow-Credentials": "true",
            "OpenAI-Organization": "org-PA9zwN9PpPNCF4kwiwurep1b",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Sec-GPC": "1",
          },
          referrer: "https://platform.openai.com/",
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      console.log("subscription", data);
      return data;
    };
    const getUsage = async () => {
      const res = await fetch(
        `https://api.openai.com/dashboard/billing/usage?end_date=${
          getEndOfCurrentMonth().toISOString().split("T")[0]
        }&start_date=${getStartOfCurrentMonth().toISOString().split("T")[0]}`,
        {
          credentials: "omit",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/114.0",
            Accept: "*/*",
            "Accept-Language": "en-GB,en;q=0.5",
            Authorization:
              "Bearer sess-aioet4W94SS6KRBnesQ2ObsPSNcmXqCloKJDU5nh",
            "OpenAI-Organization": "org-PA9zwN9PpPNCF4kwiwurep1b",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Sec-GPC": "1",
          },
          referrer: "https://platform.openai.com/",
          method: "GET",
          mode: "cors",
        }
      );
      const data = await res.json();
      console.log("usage", data);
      return data;
    };
    Promise.all([getSub(), getUsage()]).then(([sub, usage]) => {
      if (usage.total_usage) setUsage(Math.round(usage.total_usage) / 100);
      if (sub.hard_limit_usd) setHardLimit(sub.hard_limit_usd);
      setLoading(false);
    });
  }, []);

  return (
    <nav className="navbar bg-neutral text-neutral-content flex flex-col">
      <div className="flex w-full justify-between max-w-4xl mx-auto">
        {pathName !== "/" && (
          <Link href="/">
            <button className="btn btn-neutral normal-case">Back</button>
          </Link>
        )}
        <button className="btn btn-ghost normal-case text-xl ml-auto">
          rpgpt.
        </button>
      </div>
      {shouldShowBanner && (
        <div className="alert alert-warning mt-2 flex flex-col sm:flex-row max-w-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex flex-col items-end">
            <p className="ml-2 text-left">
              Due to a sudden increase in popularity, I find myself unable to
              continue incurring the maintenance costs for rpgpt for much
              longer. If you enjoy rpgpt and would like to ensure its continued
              existence and further development, please consider making a small
              donation by buying me a tea. ❤️
            </p>
            {loading && (
              <span className="loading loading-spinner loading-sm mt-4" />
            )}
            {usage && hardLimit && (
              <div className="stats bg-info mt-4 self-center">
                <div className="stat">
                  <div className="stat-title text-neutral">Current usage</div>
                  <div className="stat-value text-error-content">${usage}</div>
                  <div className="stat-desc text-neutral">
                    <div>
                      From {getStartOfCurrentMonth().toLocaleDateString()}{" "}
                    </div>
                    <div>to {today}</div>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-neutral">Donations</div>
                  <div className="stat-value text-success-content">$27</div>
                  <div className="stat-desc text-neutral">
                    <p>From 3 donors</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex mt-4">
              <button
                className="btn btn-md btn-ghost"
                onClick={handleBannerDismiss}
              >
                Dismiss
              </button>
              <Link
                href="https://www.buymeacoffee.com/jandreo"
                target="_blank"
                className="block"
              >
                <button className="btn btn-md btn-primary">
                  🍵 Buy me a tea
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
