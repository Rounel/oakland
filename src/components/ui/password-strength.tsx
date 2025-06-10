import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const calculateStrength = (password: string) => {
    let strength = 0
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ]
    strength = checks.filter(Boolean).length
    return strength
  }

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-red-500"
    }
  }

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
        return "Très faible"
      case 1:
        return "Faible"
      case 2:
        return "Moyen"
      case 3:
        return "Fort"
      case 4:
        return "Très fort"
      default:
        return "Très faible"
    }
  }

  const strength = calculateStrength(password)
  const strengthColor = getStrengthColor(strength)
  const strengthText = getStrengthText(strength)

  return (
    <div className={cn("space-y-2", className)}>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", strengthColor)}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Force du mot de passe :</span>
        <span className={cn(
          strength === 4 ? "text-green-500" :
          strength === 3 ? "text-yellow-500" :
          strength === 2 ? "text-orange-500" :
          "text-red-500"
        )}>
          {strengthText}
        </span>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <p className={cn(password.length >= 8 && "text-green-500")}>
          • Au moins 8 caractères
        </p>
        <p className={cn(/[A-Z]/.test(password) && "text-green-500")}>
          • Au moins une lettre majuscule
        </p>
        <p className={cn(/[0-9]/.test(password) && "text-green-500")}>
          • Au moins un chiffre
        </p>
        <p className={cn(/[!@#$%^&*(),.?":{}|<>]/.test(password) && "text-green-500")}>
          • Au moins un symbole {`(!@#$%^&*(),.?":{}|<>)`}
        </p>
      </div>
    </div>
  )
} 