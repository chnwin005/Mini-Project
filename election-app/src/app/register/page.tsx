"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select";

import database from "@/util/database";
import { Voter } from "@/models/voter";
import useAuthentication from "@/hooks/useAuthentication";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/util/firebase";
import { useRouter } from "next/navigation";
import { BALLOT_ROUTE, HOME_ROUTE } from "@/constants/routes";


const provinces = [
    {
        value: "WC",
        label: "Western Cape",
    },
    {
        value: "EC",
        label: "Eastern Cape",
    },
    {
        value: "NC",
        label: "Northern Cape",
    },
    {
        value: "NW",
        label: "North West",
    },
    {
        value: "FS",
        label: "Free State",
    },
    {
        value: "GP",
        label: "Gauteng",
    },
    {
        value: "MP",
        label: "Mpumalanga",
    },
    {
        value: "LP",
        label: "Limpopo",
    },
];

const validateDisposableEmail = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch(`https://disposable.debounce.io/?email=${email}`);
        const data = await response.json();
        return data.disposable === "true";
    } catch (error) {
        console.error("Error validating disposable email:", error);
        return false;
    }
};

const formSchema = z
    .object({
        firstName: z.string().min(2, "First name is too short"),
        lastName: z.string().min(2, "Last name is too short"),
        nationalId: z.string().regex(/^\d{13}$/, "Invalid National ID format"),
        province: z.enum(provinces.map((p) => p.value)), // extract province values
        emailAddress: z.string().email(),
        password: z.string().min(3),
        passwordConfirm: z.string(),
    })
    .refine((data) => {
        return data.password === data.passwordConfirm;
    }, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    }).refine(async (data) => {
        const isDisposable = await validateDisposableEmail(data.emailAddress);
        return !isDisposable;
    }, {
        message: "Disposable emails are not allowed",
        path: ["emailAddress"],
    });


export default function Home() {



    useAuthentication();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            nationalId: "",
            province: "", // Set a default province if desired
            emailAddress: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const province = form.watch("province");



    const handleSubmit = async (values: z.infer<typeof formSchema>) => {


        createUserWithEmailAndPassword(auth, values.emailAddress, values.password)
            .then(async (response) => {
                const voter: Voter = {
                    user_id: response.user?.uid,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    email: values.emailAddress,
                    nationalId: values.nationalId,
                    province: values.province,
                    voted: false,
                };

                await database.addVoter(voter);

                alert("User Registered Successfully");
                // reset();
                router.push(HOME_ROUTE);
            })
            .catch(e => {
                console.log("catch ", e.message);
                alert("Something went wrong please try again");
            });


    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="max-w-md w-full flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="nationalId"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>National ID Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="National ID Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Province</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Select your province"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {provinces.map((province) => (
                                                <SelectItem
                                                    key={province.value}
                                                    value={province.value}
                                                >
                                                    {province.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="emailAddress"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email Address"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Confirm Password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </main>
    );
}
