// "use client";

// import { PropsWithChildren } from "react";

// import { useAppSelector } from "@/global/store";
// import useSearchQuery from "@/hooks/useSerachQuery";

// const RouteProtection = ({ children }: PropsWithChildren) => {
//   const { path, router } = useSearchQuery();
//   const { userInfo } = useAppSelector((state) => state.user);

//   // Optional: skip protection for public pages
//   if (!path.startsWith("/dashboard")) {
//     return children;
//   }

//   if (userInfo?.role.some((role) => role === "super-admin")) {
//     // Super admin has access to all routes
//     return children;
//   }

//   const accessList = userInfo?.accessList || [];

//   // Check if user has access to the current path or its parent
//   const hasAccess = accessList?.some(({ route }) => {
//     const escapedRoute = route?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(`^${escapedRoute}(/.*)?$`);
//     return regex.test(path);
//   });

//   if (!hasAccess) {
//     router.replace("/dashboard");
//   }

//   return children;
// };

// export default RouteProtection;
