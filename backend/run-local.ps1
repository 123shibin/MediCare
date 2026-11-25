
# Load environment variables from .env.local

Get-Content .env.local | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()

        [Environment]::SetEnvironmentVariable(
            $name,
            $value,
            "Process"
        )
    }
}

# Start Spring Boot
.\mvnw.cmd spring-boot:run
