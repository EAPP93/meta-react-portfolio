import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: edwing@eapp.dev",
  },
  {
    icon: faGithub,
    url: "edwing@eapp.dev",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/eapp/",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];



const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  let previousScrollY = useRef(0);
  let headerRef = useRef(null);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > previousScrollY.current) {
      headerRef.current.style.transform = 'translateY(-200px)';
    } else {
      headerRef.current.style.transform = 'translateY(0)';
    }
    previousScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  })

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={-200}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            <HStack spacing={4}>
              {
                socials.map((el, i) =>
                  <a key={i} href={el.url}>
                    <FontAwesomeIcon icon={el.icon} size="2x" />
                  </a>
                )
              }
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <a onClick={handleClick("contactme")}>Contactarme</a>
              <a onClick={handleClick("projects")}>Proyectos</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
