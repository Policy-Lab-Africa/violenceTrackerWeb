import { BiFilter } from 'react-icons/bi';
import { MdOutlineSearch } from 'react-icons/md';
import { chakra, shouldForwardProp } from '@chakra-ui/react';
import DangerIcon from './DangerIcon';
import XMark from './XMark';

export const SearchIconOutline = chakra(MdOutlineSearch, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const FilterIcon = chakra(BiFilter, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

const Icons = { DangerIcon, XMark };
export default Icons;
