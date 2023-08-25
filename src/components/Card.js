import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "1rem" }}>
      <Image borderRadius="1rem" src={imageSrc} alt={title} />
      <HStack padding={3} >
        <Heading color="black" as='h2' size='xl'>{title}</Heading>
      </HStack>
      <HStack padding={3} >
        <Text color="grey" fontSize='md'>{description}</Text>
      </HStack>
      <HStack paddingBottom={4} paddingLeft={3}>
        <Text color="black" fontSize='sm'>see more</Text>
        <FontAwesomeIcon color="black" icon={faArrowRight} size="1x" />
      </HStack>
    </div>
  );
};

export default Card;