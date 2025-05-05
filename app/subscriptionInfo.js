
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SubInfo({creditsRemaining, creditsAvailable, currentSubscription, manageSub}) {
  return ( //max-w-3xl
    //<Card className="w-full  bg-[#0c0c1c] text-white mb-16">
    <div className="w-full flex flex-col items-center px-3 ">
    <Card className="w-full max-w-6xl bg-[#0c0c1c00] text-white mb-16 border-0">
    
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Subscription Details</CardTitle>
        <button className="text-sm text-gray-400 hover:text-white transition-colors" onClick={manageSub}>
          Manage billing info
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Current Plan</span>
          <span className="font-medium">{currentSubscription}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Credits Remaining</span>
            <span className="text-sm text-gray-400">{creditsRemaining}/{creditsAvailable} left</span>
          </div>
          <Progress value={creditsRemaining/creditsAvailable*100} className="h-2 bg-gray-900" indicatorClassName="bg-blue-500" />
          
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
