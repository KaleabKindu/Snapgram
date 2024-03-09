"use client";
import Loader from "@/components/common/Loader";
import GridPostList from "@/components/posts/GridPostList";
import { Input } from "@/components/ui/input";
import {
  useGetInfinitePosts,
  useGetSearchPosts,
} from "@/lib/react-query/queries";
import React, { useEffect, useState } from "react";
import { IoSearch, IoFilterOutline } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { useInView } from "react-intersection-observer";
import Error from "@/components/common/Error";
import { Models } from "appwrite";
import NoPosts from "@/components/common/NoPosts";
type Props = {};

const Explore = (props: Props) => {
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 500);
  const {
    data: searchPosts,
    isError: errorSearching,
    isLoading: searching,
  } = useGetSearchPosts(debounceQuery);

  const {
    data: posts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinitePosts();
  const { ref, inView } = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (hasNextPage && inView && !query) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold">Explore</h2>
        <div className="flex items-center bg-dark-4 rounded-full w-full px-4">
          <IoSearch size={30} />
          <Input
            className="explore-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Posts"
            type="text"
          />
        </div>
        {debounceQuery ? (
          searching ? (
            <Loader />
          ) : errorSearching ? (
            <Error />
          ) : searchPosts && searchPosts.documents.length > 1 ? (
            <GridPostList posts={searchPosts.documents} />
          ) : (
            <NoPosts message="No Posts Found" />
          )
        ) : (
          <>
            <div className="flex justify-between">
              <h3 className="body-bold md:h3-bold">Popular Today</h3>
              {/* <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <IoFilterOutline size={30} />
          </div> */}
            </div>
            {isLoading ? (
              <Loader />
            ) : isError ? (
              <Error />
            ) : posts ? (
              posts.pages.map((item, index) => (
                <GridPostList
                  key={index}
                  posts={item?.documents as Models.Document[]}
                />
              ))
            ) : (
              <NoPosts />
            )}
            {isFetchingNextPage && !query && <Loader />}
            {hasNextPage && !query && <div ref={ref} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
