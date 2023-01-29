import { BiFilter } from 'react-icons/bi';
import { MdChevronLeft, MdChevronRight, MdOutlineSearch } from 'react-icons/md';
import { FiBox } from 'react-icons/fi';
import { chakra, shouldForwardProp } from '@chakra-ui/react';
import DangerIcon from './DangerIcon';
import XMark from './XMark';
import { isValidMotionProp } from 'framer-motion';

export const SearchIconOutline = chakra(MdOutlineSearch, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const FilterIcon = chakra(BiFilter, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const ChevronLeftIcon = chakra(MdChevronLeft, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const ChevronRightIcon = chakra(MdChevronRight, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const ReportIcon = chakra(FiBox, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

const Icons = { DangerIcon, XMark };
export default Icons;
