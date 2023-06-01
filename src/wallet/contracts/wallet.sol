// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Wallet {
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) investments;
    mapping(address => mapping(address => uint256)) returnedInvestements;
    mapping(address => address[]) investors;

    function deposit(address user) external {
        balances[user] += 100;
    }

    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }

    function invest(address investor, address user, uint256 amount) public {
        require(balances[investor] >= amount, 'Insufficient balance');

        balances[investor] -= amount;
        balances[user] += amount;

        investments[user][investor] += amount;

        if (investments[user][investor] == amount) {
            investors[user].push(investor);
        }
    }

    struct InvestorStats {
        uint256 investment;
        uint256 earnings;
    }

    mapping(address => mapping(address => InvestorStats))
        public investorStatistics;

    event InvestorStatsUpdated(
        address indexed investor,
        address indexed talentUser,
        uint256 investment,
        uint256 earnings
    );

    function returnInvestments(address talentUser) public {
        require(balances[talentUser] > 0, 'No investments to return');

        uint256 totalInvestments = calculateTotalInvestments(talentUser);
        uint256 totalReturnedInvestments = calculateTotalReturnedInvestments(
            talentUser
        );

        address[] memory investorsList = investors[talentUser];
        uint256 investorsCount = investorsList.length;

        uint256 totalEarnings = balances[talentUser] - totalReturnedInvestments;

        for (uint256 i = 0; i < investorsCount; i++) {
            address investor = investorsList[i];
            uint256 investorInvestment = investments[talentUser][investor];

            uint256 investorShare = (investorInvestment * totalEarnings) /
                totalInvestments;
            uint256 investorEarnings = (investorShare *
                totalReturnedInvestments) / totalEarnings;

            balances[investor] += investorShare - investorEarnings;
            balances[talentUser] -= investorShare;

            returnedInvestements[talentUser][investor] +=
                investorShare -
                investorEarnings;

            investorStatistics[talentUser][investor] = InvestorStats({
                investment: investorInvestment,
                earnings: investorEarnings
            });

            emit InvestorStatsUpdated(
                investor,
                talentUser,
                investorInvestment,
                investorEarnings
            );
        }
    }

    function calculateTotalInvestments(
        address talentUser
    ) public view returns (uint256) {
        uint256 totalInvestments = 0;
        address[] memory investorsList = investors[talentUser];

        for (uint256 i = 0; i < investorsList.length; i++) {
            address investor = investorsList[i];
            totalInvestments += investments[talentUser][investor];
        }

        return totalInvestments;
    }

    function calculateTotalReturnedInvestments(
        address talentUser
    ) public view returns (uint256) {
        uint256 totalReturnedInvestments = 0;
        address[] memory investorsList = investors[talentUser];

        for (uint256 i = 0; i < investorsList.length; i++) {
            address investor = investorsList[i];
            totalReturnedInvestments += returnedInvestements[talentUser][
                investor
            ];
        }

        return totalReturnedInvestments;
    }
}
