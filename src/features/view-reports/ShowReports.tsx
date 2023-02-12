import {
  fetchInfiniteViolenceReports,
  fetchViolenceReports,
} from '@/app/services/violence-report';
import Tweet from '@/components/Twitter/Tweet';
import {
  Box,
  Button,
  Container,
  HStack,
  Skeleton,
  Spinner,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

export default function ShowReports() {
  const { data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [`reports`],
      ({ pageParam }) =>
        fetchInfiniteViolenceReports({ limit: 4, pageParam: pageParam }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.current_page == lastPage.last_page) return undefined;
          return Math.min(lastPage.current_page + 1, lastPage.last_page);
        },
      },
    );

  if (!data)
    return (
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
        <Skeleton width={`full`} height={`100px`} mb="32px" />
        <Skeleton width={`full`} height={`100px`} mb="32px" />
        <Skeleton width={`full`} height={`100px`} mb="32px" />
        <Skeleton width={`full`} height={`100px`} mb="32px" />
        <Skeleton width={`full`} height={`100px`} mb="32px" />
        <Skeleton width={`full`} height={`100px`} mb="32px" />
      </Container>
    );

  return (
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
      position={`relative`}
      // backgroundColor="red"
    >
      {isFetching && (
        <Spinner
          position={`absolute`}
          left={`24px`}
          top={`10rem`}
          mb={`8px`}
          alignSelf={`start`}
          color="primary.500"
        />
      )}
      {/* TwitterReport */}
      {data.pages.map((group, i) => (
        <Fragment key={i.toString()}>
          {group.data.map((report) => (
            <Tweet key={report.id.toString()} report={report} />
          ))}
        </Fragment>
      ))}
      <HStack>
        <Button
          onClick={() => fetchNextPage()}
          isDisabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          Load More
        </Button>
      </HStack>
    </Container>
  );
}
