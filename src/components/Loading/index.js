// Importing necessary dependencies from React and Material-UI
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

// Defining the Loading component
export default function Loading() {
    return (
        // Using the Stack component to style the linear progress
        <Stack sx={{ width: '100%', color: "#ff7d1b" }} >
            {/* Displaying the LinearProgress component */}
            <LinearProgress color='inherit' />
        </Stack>
    );
}
