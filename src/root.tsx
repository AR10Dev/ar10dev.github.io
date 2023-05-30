// @refresh reload
import { Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title
} from 'solid-start'
import 'virtual:uno.css'
// import { useRegisterSW } from 'virtual:pwa-register/solid'
// import { pwaInfo } from 'virtual:pwa-info'

export default function Root() {
  // useRegisterSW({immediate: true});
  return (
    <Html lang="en" class="scroll-smooth">
      <Head>
        <Meta charset="UTF-8" />
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Title>Avaab Razzaq - AR10's website</Title>
        <Meta name="author" content="AR10Dev" />
        <Meta
          name="description"
          content="The one and only official website on the internet created by Avaab Razzaq, aka 'AR10'"
        />
        {/* <Link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF"/>
        { pwaInfo?.webManifest?.href ? <Link rel="manifest" href={pwaInfo.webManifest.href}/> : '' } */}
      </Head>
      <Body class="m-0 text-white bg-gray-100 select-none scrollbar scrollbar-rounded scrollbar-track-radius-0px scrollbar-w-8px scrollbar-track-color-gray-900 scrollbar-thumb-color-gray-600">
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
