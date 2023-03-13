import { Card,Box, CardContent, Typography, Paper } from "@mui/material";
import React from "react";

import { SearchBar,ContentsList, ContentDetail } from "../component";

export function Detail(){
    return(
        <>
            <ContentDetail />
            <ContentsList />
            <SearchBar />
        </>
    )
}