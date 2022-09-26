import React, { FC, KeyboardEventHandler, useEffect, useMemo, useRef, useState } from "react";
import "./AutoComplete.css";

import AutoCompleteItem from "./AutoCompleteItem";
const API_COUNTRIES_URL = "https://restcountries.com/v3.1";

interface ICountry {
  name: string;
}

const AutoComplete: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [country, setCountry] = useState<number>(-1);
  const [data, setData] = useState<ICountry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchContainer = useRef<HTMLDivElement>(null);
  const searchResultRef = useRef<HTMLUListElement>(null);

  const getCountriesByName = (name = '/all') => {
    setIsLoading(true);
    fetch(`${API_COUNTRIES_URL}${name}`)
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map(({ name }: any) => ({ name: name.common }));
        setData(countries);
      })
      .catch(() => {
        throw new Error('Country not found');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (country < 0 || country > suggestions.length || !searchResultRef)
      return () => { };

    let listItems = Array.from(searchResultRef!.current!.children);
    const item = listItems[country] as HTMLElement;
    item && scrollInDropdown(item.offsetTop);
  }, [country]);

  const scrollInDropdown = (position: number) => {
    const item = searchResultRef?.current?.parentNode as HTMLElement;
    item?.scrollTo({
      top: position,
      behavior: "smooth"
    })
  };

  const suggestions = useMemo(() => {
    if (!search) return data;

    setCountry(-1);
    scrollInDropdown(0);

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [data, search]);


  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (
      searchContainer.current &&
      !searchContainer.current.contains(target)
    ) {
      hideSuggestion();
    }
  };

  const keyBoardNavigation: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === "ArrowDown") {
      isVisible
        ? setCountry((country) =>
          country < suggestions.length - 1 ? country + 1 : country
        )
        : showSuggestion();
    }
    if (event.code === "ArrowUp") {
      setCountry((country) => (country > 0 ? country - 1 : 0));
    }
    if (event.code === "Escape") {
      hideSuggestion();
    }
    if (event.code === "Enter" && country > -1) {
      setSearch(suggestions[country].name);
      getCountriesByName(`/name/${suggestions[country].name}`)
      hideSuggestion();
    }
  };

  const showSuggestion = () => setIsVisible(true);
  const hideSuggestion = () => setIsVisible(false);

  return (
    <div style={{ height: "100%", position: "relative" }} ref={searchContainer}>
      <input
        type="text"
        name="search"
        className="search-bar"
        autoComplete="off"
        value={search}
        onClick={showSuggestion}
        onChange={(e) => {
          setSearch(e.target.value)
          getCountriesByName(`/name/${e.target.value}`);
        }}
        onKeyDown={(e) => {
          keyBoardNavigation(e);
        }}
      />

      {isLoading ?
        <h2 style={{ textAlign: "center" }}>loading...</h2> :
        <div className={`search-result ${isVisible ? "visible" : "invisible"}`}>
          <ul className="list-group" ref={searchResultRef}>
            {suggestions.map((suggestion, index: number) => (
              <AutoCompleteItem
                key={suggestion.name}
                onSelectItem={() => {
                  hideSuggestion();
                  setSearch(suggestion.name);
                }}
                isHighlighted={country === index}
                text={search}
                {...suggestion}
              />
            ))}
          </ul>
        </div>}
    </div>
  );
};

export default AutoComplete;
