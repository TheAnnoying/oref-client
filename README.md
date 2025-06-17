# oref-client
> An alternative website to view real-time missile alerts from Israel's National Emergency Portal (פיקוד העורף)

![Preview](https://raw.githubusercontent.com/TheAnnoying/oref-client/refs/heads/main/banner.png)

## Background
When using the National Emergency Portal website, I noticed a few issues:
* The site makes constant requests from the client to check for ongoing alerts
* The site has many buttons all around, which may be confusing
* The site's missile history section doesn't update in real time, a refresh is required

I wanted to make my own client for viewing missile alerts.

## About
When somebody visits my website, they initiate a connection to my websocket server.

That server is responsible for making requests to the National Emergency Portal and receiving data.
Data is only sent to all the clients connected when it is needed. For example, the alert history is sent to clients after alerts, not every few seconds.
Even if many people were to open my site, the National Emergency Portal's servers would only receive constant requests from a single source, that is, my websocket server.

## Contains
* A sleek, minimal interface
* No constant requests to the National Emergency Portal servers
* Select which locations should emit alert sound and give them tags to identify quickly
* Different alert sounds
* Live map with alerts

## Built using:
* [SvelteKit](https://kit.svelte.dev/) (javascript framework)
* [TailwindCSS](https://tailwindcss.com/) (for styling) & [shadcn-svelte](https://www.shadcn-svelte.com/) (for all components)
* [lucide](https://lucide.dev/) (for icons)
* [socket.io](https://socket.io/) (for the websocket server)
---
> [!CAUTION]
> The information shown on the website is not intended to be a substitute for official sources of missile alerts, such as the Home Front Command app or Israel's National Emergency Portal.
> 
> We are not liable for any loss or damage caused by your reliance on the information on this website. Please always follow the instructions of the authorities and stay safe.
