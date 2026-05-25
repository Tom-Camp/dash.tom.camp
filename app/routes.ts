import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/index.tsx"),
  route("germinator", "routes/germinator/index.tsx"),
  route("nulay", "routes/nulay/index.tsx"),
  route("garden-net", "routes/garden-net/index.tsx"),
] satisfies RouteConfig;
