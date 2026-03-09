import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/index.tsx"),
  route("germinator", "routes/germinator/index.tsx"),
  route("nulay", "routes/nulay/index.tsx")
] satisfies RouteConfig;
