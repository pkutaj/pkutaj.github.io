## usecase
The aim of this how-to-guide🏁 is to see how you can easily browse and find properties in posh objects


```
▶ Get-NetIPConfiguration | gm

   TypeName: NetIPConfiguration

Name                 MemberType Definition
----                 ---------- ----------
Equals               Method     bool Equals(System.Object obj)
GetHashCode          Method     int GetHashCode()
GetType              Method     type GetType()
ToString             Method     string ToString()
AllIPAddresses       Property   ciminstance[] AllIPAddresses {get;set;}
CompartmentId        Property   int CompartmentId {get;set;}
ComputerName         Property   string ComputerName {get;set;}
Detailed             Property   bool Detailed {get;set;}
DNSServer            Property   ciminstance[] DNSServer {get;set;}
InterfaceAlias       Property   string InterfaceAlias {get;set;}
InterfaceDescription Property   string InterfaceDescription {get;set;}
InterfaceIndex       Property   int InterfaceIndex {get;set;}
IPv4Address          Property   ciminstance[] IPv4Address {get;set;}
IPv4DefaultGateway   Property   ciminstance[] IPv4DefaultGateway {get;set;}
IPv6Address          Property   ciminstance[] IPv6Address {get;set;}
IPv6DefaultGateway   Property   ciminstance[] IPv6DefaultGateway {get;set;}
IPv6LinkLocalAddress Property   ciminstance[] IPv6LinkLocalAddress {get;set;}
IPv6TemporaryAddress Property   ciminstance[] IPv6TemporaryAddress {get;set;}
NetAdapter           Property   ciminstance NetAdapter {get;set;}
NetCompartment       Property   ciminstance NetCompartment {get;set;}
NetIPv4Interface     Property   ciminstance NetIPv4Interface {get;set;}
NetIPv6Interface     Property   ciminstance NetIPv6Interface {get;set;}
NetProfile           Property   ciminstance NetProfile {get;set;}
```
<!-- TOC -->

- [1. use -expandproperty and a simple query language](#1-use--expandproperty-and-a-simple-query-language)
- [3. object → where → select](#3-object-→-where-→-select)

<!-- /TOC -->

### 1. use -expandproperty and a simple query language
* combine the property you need to expand with the identical name and `-expandProperty` flag

```
▶ Get-NetIPConfiguration | select NetAdapter -ExpandProperty NetAdapter

Name                      InterfaceDescription                    ifIndex Status       MacAddress             LinkSpeed
----                      --------------------                    ------- ------       ----------             ---------
VMware Network Adapte...8 VMware Virtual Ethernet Adapter for VM…      13 Up           00-50-56-C0-00-08       100 Mbps
VMware Network Adapte...1 VMware Virtual Ethernet Adapter for VM…      14 Up           00-50-56-C0-00-01       100 Mbps
Ethernet 3                Npcap Loopback Adapter                       20 Up           02-00-4C-4F-4F-50       1.2 Gbps
Ethernet                  Intel(R) Ethernet Connection I217-LM         31 Up           5C-B9-01-7C-90-56         1 Gbps
Ethernet 10               TAP-Windows Adapter V9 #7                    54 Disconnected 00-FF-EA-48-1A-5E       100 Mbps
Ethernet 9                TAP-Windows Adapter V9 #6                    46 Disconnected 00-FF-C8-E9-CD-AD       100 Mbps
Ethernet 8                TAP-Windows Adapter V9 #5                    48 Disconnected 00-FF-D4-6C-6A-E8       100 Mbps
Ethernet 7                TAP-Windows Adapter V9 #4                     2 Disconnected 00-FF-02-60-7B-F4       100 Mbps
Ethernet 6                TAP-Windows Adapter V9 #3                    27 Disconnected 00-FF-7B-58-9D-40       100 Mbps
Ethernet 5                TAP-Windows Adapter V9 #2                    24 Disconnected 00-FF-6D-04-0F-11       100 Mbps
VPN                       TAP-Windows Adapter V9                       42 Disconnected 00-FF-BA-B9-D0-40       100 Mbps
Síťové připojení Bluetoo… Bluetooth Device (Personal Area Networ…      55 Disconnected CC-3D-82-23-25-0C         3 Mbps
Wi-Fi                     Intel(R) Dual Band Wireless-AC 7260           6 Disconnected CC-3D-82-23-25-08          0 bps
Cellular                  HP lt4112 Gobi 4G Module                     12 Disconnected B0-83-88-43-55-5C          0 bps
```

### 3. object → where → select
* this is **opposite from SQL**
* because the pipe is already a filter
* so this does not work

```powershell
▶ Get-NetIPConfiguration | Select InterfaceAlias | Where {$_.NetAdapter.Status -eq "up"}
>>> no result
```

* but this works

```powershell
▶ Get-NetIPConfiguration | Where {$_.NetAdapter.Status -eq "up"} | Select InterfaceAlias

InterfaceAlias
--------------
VMware Network Adapter VMnet8
VMware Network Adapter VMnet1
Ethernet 3
Ethernet
Ethernet 10
```
