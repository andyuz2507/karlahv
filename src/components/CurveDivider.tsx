type Variant = 'cream' | 'berry' | 'cream-light' | 'wave' | 'white' | 'ink' | 'off-white'

export function CurveDivider({ variant = 'cream' }: { variant?: Variant }) {
  const fill: Record<Variant, string> = {
    cream: '#F5F0EB',
    'cream-light': '#F8F4F2',
    berry: '#7F334E',
    wave: '#F8F4F2',
    white: '#FFFFFF',
    ink: '#0F0A0C',
    'off-white': '#FAFAF7',
  }

  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 md:h-24"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120V60C240 0 480 0 720 30C960 60 1200 90 1440 60V120H0Z"
          fill={fill[variant]}
        />
      </svg>
    </div>
  )
}
