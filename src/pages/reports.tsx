import { AnimatedBox } from '@/components/Animated';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DislikeIcon,
  FilterIcon,
  LikeIcon,
  ReportIcon,
  SearchIconOutline,
  ShareIcon,
} from '@/components/Icons';
import ArrowRight from '@/components/Icons/ArrowRight';
import BallotBoxIcon from '@/components/Icons/BallotBoxIcon';
import DangerIcon from '@/components/Icons/DangerIcon';
import Dislike from '@/components/Icons/Dislike';
import XMark from '@/components/Icons/XMark';
import { NextChakraImage } from '@/components/Images/NextChakraImage';
import SearchWithFilter from '@/components/Inputs/SearchWithFilter';
import Tweet from '@/components/Twitter/Tweet';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { count } from 'console';
import { useState } from 'react';

type ValidState = `idle` | `loading` | `failed` | `completed` | `download`;

interface UnitReport {
  count: number;
  description: string;
  icon: string;
}
interface Report {
  title: string;
  summary: string;
  data: UnitReport[];
}

const currentReport: Report = {
  title: `Edo State`,
  summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id animi placeat repudiandae libero nisi, hic perspiciatis. Veritatis eos architecto dignissimos atque nulla vel eligendi repellat, reprehenderit deleniti quos ducimus. Magni.`,
  data: [
    { count: 7, description: `Voilence in :x: LGA`, icon: `violence` },
    { count: 30, description: `:x: Ballot Boxes Snatched`, icon: `violence` },
    { count: 5000, description: `Approx. :x: Injured`, icon: `violence` },
    { count: 3, description: `:x: Group Clash Incidence`, icon: `violence` },
    { count: 200, description: `Approx. :x: Killed`, icon: `violence` },
    { count: 7, description: `:x: Sexual Violence Cases`, icon: `violence` },
  ],
};

export default function Reports() {
  return (
    <Box bgColor={`secondary.900`} minHeight={`90vh`}>
      <VStack px={[`1rem`, `6rem`]} pb={`5rem`} alignItems={`start`}>
        <Flex
          bgColor={`secondary.900`}
          alignItems={`center`}
          width={`full`}
          justifyContent={`space-between`}
          position={`fixed`}
          pt={`2rem`}
          pb={`0.5rem`}
        >
          <Heading fontSize={`2xl`} fontWeight={`bold`} color={`primary.500`}>
            Reports
          </Heading>

          <SearchWithFilter />
          <Box />
        </Flex>

        <Container
          pt={`10rem`}
          maxWidth={[`sm`, `container.md`]}
          height={`full`}
          display={`flex`}
          alignSelf={`center`}
          flexDirection={`column`}
          justifyContent={`center`}
          alignItems={`center`}
          px={`16px`}
        >
          {/* TwitterReport */}
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </Container>
      </VStack>
    </Box>
  );
}
