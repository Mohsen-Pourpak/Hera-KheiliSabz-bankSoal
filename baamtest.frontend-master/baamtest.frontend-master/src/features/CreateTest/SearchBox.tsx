import React, { useState } from "react";
import { IconButton, Grid } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { NormalInput } from "../../components/Form/TextField";

export default function SearchBox({
  onSubmit,
  searchFetched,
}: {
  searchFetched: boolean;
  onSubmit: (search: string) => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <form
      style={{ display: "flex", width: "100%", borderRadius: 0 }}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(search);
      }}
    >
      <NormalInput
        placeholder="جست و جو در مباحث"
        style={{ height: 40, flexGrow: 1, borderRadius: 0 }}
        fullWidth
        onChange={e => {
          setSearch(e.target.value);
        }}
        onBlur={e => {
          setSearch(e.target.value);
        }}
      />

      <IconButton type="submit" color={searchFetched ? "secondary" : "primary"}>
        <SearchRounded />
      </IconButton>
    </form>
  );
}

// onSubmit={e => {
//     e.preventDefault();
//     if (this.state.search) {
//       this.setState({ searchFetched: true });
//       this.getBooks(
//         this.state.fieldId,
//         this.state.gradeId,
//         this.state.search,
//       );
//     } else {
//       this.setState({ searchFetched: false });
//       this.getBooks(this.state.fieldId, this.state.gradeId);
//     }
//   }}
