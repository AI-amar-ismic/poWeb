import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Citat`.
 */
export type CitatProps = SliceComponentProps<Content.CitatSlice>;

/**
 * Component for "Citat" Slices.
 */
const Citat = ({ slice }: CitatProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for citat (variation: {slice.variation}) Slices
    </section>
  );
};

export default Citat;
