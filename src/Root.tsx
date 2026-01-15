//import { useState, useEffect } from "react";
//import { Link } from "react-router";

export const Root = () => {
  return (
    <div className="space-x-2 space-y-2 flex flex-wrap text-l">
      <Card title="bulbasaur - 1" />
      <Card title="ivysaur - 2"/>
      <Card title="venosaur - 3"/>

    </div>
  );
};

const Card = (props: { title: string, }) => {
  return (
    <div className="bg-gray-300 w-60 h-60 text-up flex items-start justify-center">
      {props.title}
    </div>
  );
};
