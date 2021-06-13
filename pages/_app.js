import React, { useEffect } from "react"

import Head from "next/head"

import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

import theme from "../components/MuiTheme"

import { AppBar, Toolbar, Typography, Container, Box } from "@material-ui/core"

import { Global, GlobalState } from "../components/Global"

const app = ({ Component, pageProps }) => {

    useEffect(() => {

        // Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
        window.GlobalState = GlobalState;
    
    }, [])

    return (
        <>
            <Head>
                <title>ToDo</title>
                <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="Access-Control-Allow-Origin" content="*" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="google" value="notranslate" />

                <link href="https://fonts.googleapis.com/css?family=Nunito:300,400" rel="stylesheet" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Todo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Box style={{ marginTop: 10 }}>
                        <Global Root={() => <Component {...pageProps} />} />
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )

}

export default app