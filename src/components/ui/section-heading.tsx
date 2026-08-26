import {
  headingTwoClass,
  introClass,
  kickerClass,
  sectionHeadingClass,
} from "@/styles/classes";

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={`${sectionHeadingClass} reveal`} data-reveal="rise">
      <p className={kickerClass}>{kicker}</p>
      <h2 className={`${headingTwoClass} reveal`} data-reveal="mask">
        {title}
      </h2>
      {description ? <p className={introClass}>{description}</p> : null}
    </div>
  );
}
