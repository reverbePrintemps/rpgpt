import { LocalStorageItems, useLocalStorage } from "../utils/local-storage";
import { DEFAULT_SELECTED_THEME, Theme } from "../constants/theme";
import { DropdownArrowIcon } from "../assets/DropdownArrowIcon";
import { ThemePickerIcon } from "../assets/ThemePickerIcon";
import { useEffect, useState } from "react";
import { Dropdown } from "react-daisyui";

export const ThemePicker = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>();
  const { value: theme, setValue: setTheme } = useLocalStorage(
    LocalStorageItems.Theme,
    DEFAULT_SELECTED_THEME
  );

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      setSelectedTheme(theme);
    }
  }, [theme]);

  const changeTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const theme = e.currentTarget.getAttribute("data-set-theme") as Theme;
    setSelectedTheme(theme);
    setTheme(theme);
  };

  return (
    <Dropdown title="Change Theme" end>
      <Dropdown.Toggle color="ghost">
        <ThemePickerIcon />
        <DropdownArrowIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow mt-16">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {Object.entries(Theme).map(([theme, _]) => (
            // Using generic button. Button component adds unwanted styles
            <button
              key={theme}
              className={`outline-base-content overflow-hidden rounded-lg text-left ghost ${
                theme === selectedTheme ? "[&_svg]:visible" : ""
              }`}
              data-set-theme={theme}
              //   data-act-class="[&_svg]:visible"
              onClick={changeTheme}
            >
              <div
                data-theme={theme}
                className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="invisible h-3 w-3 shrink-0"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                    </svg>{" "}
                    <div className="flex-grow text-sm normal-case">{theme}</div>{" "}
                    <div
                      className="flex h-full flex-shrink-0 flex-wrap gap-1"
                      data-svelte-h="svelte-izuv7l"
                    >
                      <div className="bg-primary w-2 rounded"></div>{" "}
                      <div className="bg-secondary w-2 rounded"></div>{" "}
                      <div className="bg-accent w-2 rounded"></div>{" "}
                      <div className="bg-neutral w-2 rounded"></div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
