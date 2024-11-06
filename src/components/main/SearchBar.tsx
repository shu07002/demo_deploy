import styled from 'styled-components';
import { countries } from 'constants/countries';
import { majors } from 'constants/majors';
import * as d3 from 'd3-geo';

interface SearchBarProps {
  selectedCountryName: string | null;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string | null>>;
  svgRef: React.RefObject<SVGSVGElement>;
  mapBoxRef: React.RefObject<HTMLDivElement>;
  setTransform: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<SVGPathElement | null>
  >;
}

export default function SearchBar({
  selectedCountryName,
  setSelectedCountryName,
  svgRef,
  mapBoxRef,
  setTransform,
  setSelectedCountry
}: SearchBarProps) {
  const onClickSearchButton = () => {
    if (mapBoxRef.current && svgRef.current) {
      const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      const projection = d3
        .geoMercator()
        .scale(100)
        .translate([svgRect.width / 2 + 200, svgRect.height / 2 + 200]);

      const countryData = countries.find(
        (country) => country.name === selectedCountryName
      );

      const countryPath = svgRef.current.querySelector(
        `.country[title="${selectedCountryName}"]`
      ) as SVGPathElement;

      if (countryPath) {
        countryPath.style.fill = 'orange';
        setSelectedCountry(countryPath);
      }

      if (countryData) {
        const projectedCoordinates = projection([
          countryData.longitude,
          countryData.latitude
        ]);

        if (projectedCoordinates) {
          const [x, y] = projectedCoordinates;
          const translateX = mapBoxRect.width / 2 - x;
          const translateY = mapBoxRect.height / 2 - y;

          const newTransform = `scale(1) translate(${translateX}px, ${translateY}px)`;
          console.log('Setting transform in SearchBar:', newTransform);
          setTransform(newTransform);
        }
      }
    }
  };
  return (
    <SearchContainer>
      {"Let's looking for friends in Sogang!"}
      <div>
        <select
          name="countries"
          id=""
          value={selectedCountryName || ''}
          onChange={(e) => setSelectedCountryName(e.target.value)}
        >
          <option disabled hidden value="">
            Select Country
          </option>
          {countries.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select name="major" id="">
          <option disabled hidden value="">
            Select Major
          </option>
          {majors.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <SearchButton onClick={onClickSearchButton}>Search</SearchButton>
      </div>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 10rem;
  font-size: 2.4rem;
  font-weight: 600;

  > div {
    margin-top: 1rem;
    > * {
      margin-left: 0.5rem;
    }

    > select {
      width: 16rem;
      height: 4.2rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`;

const SearchButton = styled.button`
  padding:0.75rem;
  width: 7rem;
  height: 4.2rem;
  color: white;
  font-style: italic;
  cursor:pointer;
  background-image: linear-gradient(to top, #000000, green);
  border:none;
  border-radius: 0.5rem;
};
`;
