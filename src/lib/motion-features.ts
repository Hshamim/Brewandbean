// Framer Motion animation features, split into their own chunk and loaded after
// hydration by <LazyMotion> (see components/Providers.tsx). domAnimation covers
// animate / exit / variants / whileInView — everything this site uses.
import { domAnimation } from "framer-motion";

export default domAnimation;
