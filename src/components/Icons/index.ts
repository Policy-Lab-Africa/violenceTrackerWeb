import { BiFilter } from 'react-icons/bi';
import {
  MdCancel,
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineSearch,
  MdOutlineShare,
  MdShare,
} from 'react-icons/md';
import { FiBox, FiShare } from 'react-icons/fi';
import {
  FaPlayCircle,
  FaRecordVinyl,
  FaRegPlayCircle,
  FaShare,
  FaStop,
  FaVideo,
} from 'react-icons/fa';
import { TiCancel, TiCancelOutline, TiTimes } from 'react-icons/ti';
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

export const LikeIcon = chakra(MdCheck, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const DislikeIcon = chakra(TiTimes, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const ShareIcon = chakra(FaShare, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const RecordIcon = chakra(FaVideo, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const PlayVideoIcon = chakra(FaRegPlayCircle, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export const StopRecordIcon = chakra(FaStop, {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
});

const Icons = { DangerIcon, XMark };
export default Icons;
