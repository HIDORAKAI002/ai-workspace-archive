import logging
import sys


def configure_logging(name: str = "sequential-thinking") -> logging.Logger:
    """Configure and return a logger with standardized settings.
    
    Args:
        name: The name for the logger
        
    Returns:
        logging.Logger: Configured logger instance
    """
    # Configure root logger
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stderr)
        ]
    )
    
    # Get and return the named logger
    return logging.getLogger(name)
