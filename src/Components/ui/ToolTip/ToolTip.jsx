import * as Tooltip from "@radix-ui/react-tooltip";

export default function ToolTipComponent({ btn, content }) {
  return (
    <>
      <Tooltip.Root>
        {/* btn */}
        <Tooltip.Trigger asChild>{btn}</Tooltip.Trigger>
        
        {/* hover */}
        <Tooltip.Content side="bottom" sideOffset={2} className="btn-content">
          {content}
          <Tooltip.Arrow className="fill-secondry" />
        </Tooltip.Content>
      </Tooltip.Root>
    </>
  );
}
