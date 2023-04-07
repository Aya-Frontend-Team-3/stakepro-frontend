// import React from 'react'
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Button,
  HStack,
  Input,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Alert,
  useToast,
} from "@chakra-ui/react";
import {
  connect,
  isMetaMaskInstalled,
  getProvider,
  getSigner,
} from "../connection/metamask";
import { formatEther, Contract, parseEther } from "ethers";
import ABI from "../abi/mint.json";


function UserContentA() {
  const refresh = () => window.location.reload(true)


  const [account, setAccount] = useState("");
  const [myBalance, setMyBalance] = useState("");
  const [mintValue, setMintValue] = useState("");
  const [chainError, setChainError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (account) {
      getBalance(account);
      setChainError(null);
    }
  }, [account]);

  const checkMetamask = async () => {
    if (isMetaMaskInstalled) {
      if (window.ethereum.chainId === "0x61") {
        const userAccount = await connect();
        console.log(userAccount);
        setAccount(userAccount[0]);
      } else {
        setChainError("Change to Binance Smart Contract Testnet");
        throw new Error("Change to Binance Smart Contract Testnet");
      }
    } else {
      throw new Error("Install metamask");
    }
  };

  const getBalance = async (myAccount) => {
    const provider = getProvider();
    const balance = await provider.getBalance(myAccount);
    setMyBalance(formatEther(balance));
    return balance;
  };

  const venusSmartContract = async () => {
    const signer = await getSigner();
    // Create a contract
    const venusSmartContract = new Contract(
      "0x2E7222e51c0f6e98610A1543Aa3836E092CDe62c",
      ABI,
      signer
    );
    return venusSmartContract;
  };

  const mint = async () => {
    let balance = await getBalance(account);
    balance = parseInt(balance) * 10 ** -18;

    if (balance < Number(mintValue)) {
      toast({
        position: "top-left",
        render: () => (
          <Box color="white" p={3} bg="red.500">
            Insufficient Balance!
          </Box>
        ),
      });
    }
    try {
      const smartContract = await venusSmartContract();
      const tx = await smartContract.mint({
        value: parseEther(mintValue),
      });
      const receipt = await tx.wait(1);
      if (receipt.status) {
        toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="green.500">
              Transaction successful
            </Box>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const walletConnection = () => {
    try {
      checkMetamask();
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            {chainError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Wrong Network!</AlertTitle>
                <AlertDescription>
                  Please change to Binance Smart Contract testnet
                </AlertDescription>
              </Alert>
            )}
            {/* <Text>Binance Venus Smart Contract.</Text> */}
           
            <Text>{account}</Text>
            <Text>{myBalance}</Text>
            <Button onClick={walletConnection} disabled={account}>
              {account ? "Connected" : "Connect Wallet"}
            </Button>

            {/* <Box bg='black' w='100%' p={1} color='white'>
             <HStack>
              <Text p={5}>Token</Text>
              <Text p={5}>Est. APR</Text>
              <Text p={5}>Staking Duration</Text>
              <Text p={5}>Minimum Stake</Text>
              <Text p={5}>Stake Amount</Text>
             </HStack>
            </Box> */}


            <Box bg='black' w='100%' p={1} color='white'>
             <HStack>
              <Text p={5}>Token</Text>
              <Text p={5}>Est. APR</Text>
              <Text p={5}>Staking Duration</Text>
              <Text p={5}>Minimum Stake</Text>
              <Text p={5}>Stake Amount</Text>
             </HStack>
            </Box>

            <HStack spacing="50px">
              <Text> <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z" fill="#B68900"/>
                    <path d="M20.4748 11.8628L12.3628 3.75L4.25 11.8628L12.3628 14.8598L20.4748 11.8628ZM6.773 11.175L12.2727 5.5515C12.2727 5.5515 17.6495 11.0513 17.876 11.1615C18.1033 11.271 14.1778 11.1615 14.1778 11.1615L12.3628 9.30525L10.5268 11.175H6.773ZM12.3628 15.4305L20.4748 12.4125L12.3628 19.9748L4.25 12.4538L12.3628 15.4313V15.4305Z" fill="white"/>
                    </svg></Text>
              <Text>ETH</Text>
              <Text>4.5%</Text>
              <Text>180Days</Text>
              <Text>0.001ETH</Text>
              
              <Input
                value={mintValue}
                onChange={(e) => setMintValue(e.target.value)}
                placeholder="enter value to mint"
              ></Input>
              <Button 
              onClick={mint} onChange={refresh}
              px={10} colorScheme='red'>Stake</Button>
              <Button px={10} colorScheme='green'>Unstake</Button>
            </HStack>



            <HStack spacing="50px">
              <Text> <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z" fill="#B68900"/>
                    <path d="M20.4748 11.8628L12.3628 3.75L4.25 11.8628L12.3628 14.8598L20.4748 11.8628ZM6.773 11.175L12.2727 5.5515C12.2727 5.5515 17.6495 11.0513 17.876 11.1615C18.1033 11.271 14.1778 11.1615 14.1778 11.1615L12.3628 9.30525L10.5268 11.175H6.773ZM12.3628 15.4305L20.4748 12.4125L12.3628 19.9748L4.25 12.4538L12.3628 15.4313V15.4305Z" fill="white"/>
                    </svg></Text>
              <Text>ETH</Text>
              <Text>4.5%</Text>
              <Text>Locked</Text>
              <Text>0.001ETH</Text>
              
              <Input
                // value={mintValue}
                // onChange={(e) => setMintValue(e.target.value)}
                // placeholder="enter value to mint"
              ></Input>
              <Button px={10} colorScheme='red'>Stake</Button>
              <Button px={10} colorScheme='gray'>23:14:06:28</Button>
            </HStack>

            <HStack spacing="50px">
              <Text> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.185547C9.66322 0.185547 7.37895 0.878475 5.43601 2.17671C3.49307 3.47494 1.97873 5.32016 1.08449 7.47904C0.190254 9.63792 -0.0437191 12.0135 0.412159 14.3053C0.868037 16.5972 1.99329 18.7024 3.64563 20.3547C5.29796 22.0071 7.40316 23.1323 9.69502 23.5882C11.9869 24.0441 14.3624 23.8101 16.5213 22.9159C18.6802 22.0216 20.5254 20.5073 21.8237 18.5644C23.1219 16.6214 23.8148 14.3371 23.8148 12.0004C23.8193 10.4533 23.5191 8.92056 22.9312 7.48956C22.3434 6.05855 21.4794 4.75735 20.3887 3.66024C19.2979 2.56313 18.0018 1.6916 16.5742 1.09541C15.1467 0.49922 13.6157 0.190048 12.0686 0.185547H12ZM12.2002 12.4009L10.9701 16.549H17.5498C17.5934 16.5474 17.6368 16.5545 17.6777 16.5698C17.7185 16.5851 17.756 16.6082 17.7879 16.638C17.8197 16.6678 17.8454 16.7035 17.8635 16.7432C17.8816 16.7829 17.8916 16.8258 17.8931 16.8694V16.9781L17.3209 18.952C17.2957 19.0453 17.2395 19.1273 17.1615 19.1845C17.0835 19.2417 16.9884 19.2706 16.8918 19.2666H6.82205L8.50988 13.5166L6.62179 14.0887L7.0509 12.7728L8.93899 12.2006L11.3134 4.13336C11.3395 4.04054 11.396 3.95913 11.4737 3.9021C11.5515 3.84508 11.6461 3.81571 11.7425 3.81868H14.2886C14.3321 3.81715 14.3756 3.82423 14.4165 3.83951C14.4573 3.85479 14.4947 3.87797 14.5266 3.90772C14.5585 3.93748 14.5842 3.97323 14.6023 4.01293C14.6203 4.05263 14.6304 4.0955 14.6319 4.13908V4.24779L12.6293 11.0563L14.5174 10.4842L14.1169 11.8573L12.2002 12.4009Z" fill="#3E5C98"/>
                </svg></Text>
              <Text>LTC</Text>
              <Text>4.5%</Text>
              <Text>Locked</Text>
              <Text>0.001LTC</Text>
              
              <Input
                // value={mintValue}
                // onChange={(e) => setMintValue(e.target.value)}
                // placeholder="enter value to mint"
              ></Input>
              <Button px={20}>Coming soon!</Button>
            </HStack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>


    </>
  )
}

export default UserContentA



// export const App = () => {
//   const refresh = () => window.location.reload(true)

//   return (
//       <button onClick={refresh}>Refresh</button>
//   )
// }