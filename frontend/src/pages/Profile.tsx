import React from "react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserDetailsForm from "@/components/profile/UserDetailsForm";
import PasswordForm from "@/components/profile/PasswordForm";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import UserOrderHistory from "@/components/profile/UserOrderHistory";

const Profile: React.FC = () => {
  const { user } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto max-w-6xl px-2 xl:px-0 py-4 xl:py-6"
    >
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="flex justify-center items-center space-x-4">
          <TabsTrigger value="details">User Details</TabsTrigger>
          <TabsTrigger
            value="orderhistory"
            className={cn(user && user.role === "admin" && "hidden")}
          >
            Order History
          </TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent>
              <UserDetailsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <PasswordForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="orderhistory"
          className={cn(user && user.role === "admin" && "hidden")}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <UserOrderHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Profile;
