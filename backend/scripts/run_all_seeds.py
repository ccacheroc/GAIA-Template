import asyncio
from scripts.seed_teacher import seed_teacher
from scripts.seed_auth import main as seed_auth

async def run_all():
    print("Starting global seed...")
    await seed_teacher()
    await seed_auth()
    print("Global seed finished.")

if __name__ == "__main__":
    asyncio.run(run_all())
