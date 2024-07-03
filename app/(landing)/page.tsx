import { auth } from "@/auth"
import FeaturesHome from "@/components/Landing/features"
import Footer from "@/components/Landing/footer"
import HeroBanner from "@/components/Landing/hero"
import HeroHome from "@/components/Landing/home"
import PricingHome from "@/components/Landing/pricing"
import { getUserByEmail } from "@/helpers/get-user"
 
export default async function Page() {
  // const session = await auth()
  // if (!session || !session.user?.email) return <div>Not authenticated</div>
  // const user = await getUserByEmail(session.user.email)
  // if(!user) return;
 
  return (
    <div>
      {/* <HeroHome /> */}
      <HeroBanner />
      <FeaturesHome />
      <PricingHome />
      <Footer />
    </div>
  )
}