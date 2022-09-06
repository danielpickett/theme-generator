import './Chip.scss'

export const Chip = ({
  variant,
  children,
}: {
  variant: string
  children: string
}) => {
  return (
    <div
      className="Chip"
      style={{
        backgroundColor: `var(--color-${variant})`,
        color: `var(--text-on-${variant}--vivid)`,
      }}
    >
      {children}
    </div>
  )
}
